import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { BriefcaseIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import TableFooter1 from "./TableFoot";

function BCard({ title, options, icon, detail, onEdit, onDelete }) {
  return (
    <Card
      shadow={false}
      className="rounded-lg border border-gray-300 p-4"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="border border-gray-200 p-2.5 rounded-lg">
            {icon}
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
              {title}
            </Typography>
            <Typography
              className="!text-gray-600 text-xs font-normal"
            >
              {detail}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2"
            onClick={onEdit}
          >
            <PencilIcon className="h-4 w-4 text-gray-600" />
            <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
              Edit
            </Typography>
          </Button>
          <Button
            size="sm"
            variant="text"
            color="red"
            className="flex items-center gap-2"
            onClick={onDelete}
          >
            <TrashIcon className="h-4 w-4 text-red-500" />
            <Typography className="!font-semibold text-xs text-red-500 md:block hidden">
              delete
            </Typography>
          </Button>
        </div>
      </div>
      <div>
        {options && (
          <div>
            {Object.keys(options).map((label) => (
              <div key={label} className="flex gap-1">
                <Typography className="mb-1 text-xs !font-medium !text-gray-600">
                  {label}:
                </Typography>
                <Typography
                  className="text-xs !font-bold"
                  color="blue-gray"
                >
                  {options[label]}
                </Typography>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function Block1() {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleOpen = () => setIsOpen(!isOpen);

  const handleAdd = () => {
    setCurrentNote(null);
    setTitle("");
    setDetail("");
    handleOpen();
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setDetail(note.detail);
    handleOpen();
  };

  const handleDelete = (noteToDelete) => {
    setNotes(notes.filter(note => note !== noteToDelete));
  };

  const handleSave = () => {
    if (currentNote) {
      setNotes(notes.map(note => 
        note === currentNote ? { ...note, title, detail } : note
      ));
    } else {
      setNotes([...notes, { title, detail, icon: <BriefcaseIcon className="h-5 w-5" /> }]);
    }
    handleOpen();
  };

  return (
    <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
      <Card shadow={false}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex gap-2 flex-col md:flex-row items-start !justify-between"
        >
          <div className="w-full mb-2">
            <Typography className="!font-bold" color="blue-gray">
              Self Notes
            </Typography>
            <Typography
              className="mt-1 !font-normal !text-gray-600"
              variant="small"
            >
              View and update your notes.
            </Typography>
          </div>
          <div className="w-full">
            <Button
              size="sm"
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
              onClick={handleAdd}
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              add new note
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 !p-4">
          {notes.map((note, key) => (
            <BCard 
              key={key} 
              {...note} 
              onEdit={() => handleEdit(note)}
              onDelete={() => handleDelete(note)}
            />
          ))}
        </CardBody>
      </Card>
      <TableFooter1/>

      <Dialog open={isOpen} handler={handleOpen}>
        <DialogHeader>{currentNote ? "Edit Note" : "Add New Note"}</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input 
              label="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
            <Textarea 
              label="Detail" 
              value={detail} 
              onChange={(e) => setDetail(e.target.value)} 
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSave}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

export default Block1;