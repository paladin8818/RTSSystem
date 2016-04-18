__author__ = "Dmitry"
__date__ = "$13.04.2016 16:54:04$"

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
from settings import Settings
import utils
import database

import json
import cgi
import ssl

hostName = "localhost"
hostPort = 4443
smsApiId = "aed18ae0-773a-f164-75f7-7336f97e4998"

config = Settings()

class MyServer(BaseHTTPRequestHandler):
    def do_POST(self):
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST',
                     'CONTENT_TYPE':self.headers['Content-Type'],
            })

        form_dict = utils.cgiFieldStorageToDict(form)
        
        operation_result = {};
        
        if 'sell_query' in form_dict :
            jsondata = json.loads(form_dict['sell_query'])
            route = jsondata['route'];
            passengers = jsondata['route'];
            tickets_order = {'key': jsondata['key'],
                            'phone': jsondata['phone'],
                            'full_amount': jsondata['full_amount']}
            operation_result = database.paste_tickets_order(tickets_order)
            #database.paste_route()
                
        response = json.dumps(operation_result)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))
        return

myServer = HTTPServer((hostName, hostPort), MyServer)

try:
    myServer.socket = ssl.wrap_socket(myServer.socket,
                                   server_side=True,
                                   certfile='server.pem',
                                   ssl_version=ssl.PROTOCOL_TLSv1)
    myServer.serve_forever()
except KeyboardInterrupt:
    pass

myServer.server_close()