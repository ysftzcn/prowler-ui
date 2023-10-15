import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reader } from "./lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const [search, setSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [fileKeys, setFileKeys] = useState<any>();
  const [selectedKey, setSelectedKey] = useState("");

  const handleOnChange = (event: any) => {
    setSearch(event.target.value);
  };
  const handleOnKeySelect = (value: string) => {
    setSelectedKey(value);
  };

  const handleFileOnChange = (event: any) => {
    reader(event.target.files[0], (err: any, res: any) => {
      const data = JSON.parse(res);
      console.log(Object.keys(data[0]));
      setFileKeys(Object.keys(data[0]));
      setUploadedFile(data);
    });
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="text" onChange={handleOnChange} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="upload">Upload a file</Label>
        <Input id="upload" type="file" onChange={handleFileOnChange} />
      </div>
      <Select onValueChange={handleOnKeySelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a key" />
        </SelectTrigger>

        <SelectContent>
          {fileKeys &&
            fileKeys.map((item: any) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {uploadedFile &&
        selectedKey &&
        uploadedFile
          .filter((item: any) => {
            return item[selectedKey]
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((item: any, index: any) => (
            <div key={index}>{item[selectedKey]}</div>
          ))}
    </>
  );
}

export default App;
