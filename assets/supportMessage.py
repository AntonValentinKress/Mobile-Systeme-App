#!/usr/bin/python
from sense_hat import SenseHat
import json
import datetime

sense = SenseHat()

sense.show_message("Calling support...")  # Kein asyncio.run notwendig

output = {
    "message": "Calling support successful",
    "datetime": datetime.datetime.now().isoformat()  # datetime-Objekt in ISO-Format umwandeln
}

print(json.dumps(output))
