#!/usr/bin/python
import json
from sense_hat import SenseHat

s = SenseHat()

t, p, h, o = s.get_temperature(), s.get_pressure(), s.get_humidity(), s.get_orientation()

output = {
    "temperature": t,
    "pressure": p,
    "humidity": h,
    "orientation": o
}

print(json.dumps(output))