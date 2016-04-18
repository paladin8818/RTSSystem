__author__ = "Dmitry"
__date__ = "$29.03.2016 15:15:41$"

class Settings:
    configPath = "config"
    configs = {}
    file = ""
    def load(self):
        try: 
            self.file = open(self.configPath)
            for line in self.file:
                if line[0] != "#":
                    splitResult = line.rstrip('\n').split("=", 1)
                    self.configs.update({splitResult[0]: splitResult[1]})
            return True
        except FileNotFoundError:
            return False
                
    
    def setting(self, name, value = None):
        if value == None:
            return self._getSetting(name)
        else:
            return self._setSetting(name, value)
    
    def _getSetting(self, name):
        if len(self.configs) == 0:
            if self.load() :
                return self.configs.get(name)
            else:
                return None
        return self.configs.get(name)
    
    def _setSetting(self, name, value):
        return None
    
    def debug(self):
        print(self.configs)