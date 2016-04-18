__author__ = "Dmitry"
__date__ = "$18.04.2016 9:13:52$"

import pymysql, pymysql.cursors
from settings import Settings

def paste_tickets_order (order):
    db = get_db()
    cursor = db.cursor()
    sql = "insert into tickets_order (id, phone, full_amount)"
    sql += " values('"+order['key']+"', '"+order['phone']+"', "+str(order['full_amount'])+" )"
    try:
        cursor.execute(sql)
        db.commit()
        return {"error": 0}
    except pymysql.err.IntegrityError as error:
        code, message = error.args
        return {"error": 1, "data": message}
    
def paste_route(route):
    db = get_db()
    cursor = db.cursor()
    sql = "insert into routes"
    sql += "(tr_num, depart_place, wagon_class, depart_date, depart_time, arrival_date, arrival_time, wagon_num, wagon_type, arrival_place) "
    sql += " values('"+route['tr_num']+"', '"+route['depart_place']+"', '"+route['wagon_class']+"', "
    sql += " '"+route['depart_date']+"', '"+route['depart_time']+"', '"+route['arrival_date']+"', '"+route['arrival_time']+"',  '"+route['wagon_num']+"',  '"+route['wagon_type']+"',  '"+route['arrival_place']+"')"
    cursor.execute(sql)
    db.commit()
    
    
def get_db():
    config = Settings()
    return pymysql.connect(host=config.setting("dbhost"),
        user=config.setting("dbuser"),
        passwd=config.setting("dbpassword"),
        db=config.setting("dbbase"),
        charset="utf8")