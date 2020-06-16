import sys
import json
import pandas as pd




print(sys.argv);


arr = {
  "filename": "OFR",
  "columns": 30,
  "from": "Online"
}
encodejson = json.dumps(arr)
print(encodejson)