__author__ = "Dmitry"
__date__ = "$18.04.2016 8:52:25$"

def cgiFieldStorageToDict( fieldStorage ):
   params = {}
   for key in fieldStorage.keys():
      params[ key ] = fieldStorage[ key ].value
   return params