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
} from "@material-tailwind/react";
import { BriefcaseIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import TableFooter1 from "./TableFoot";

function BCard({ title, options, icon, detail, onEdit, onDelete }) {
  return (
    <Card shadow={false} className="rounded-lg border border-gray-300 p-4">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="border border-gray-200 p-2.5 rounded-lg">
            {icon}
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
              {title}
            </Typography>
            <Typography className="!text-gray-600 text-xs font-normal">
              {detail}
            </Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button size="sm" variant="text" className="flex items-center gap-2" onClick={onEdit}>
            <PencilIcon className="h-4 w-4 text-gray-600" />
            <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
              Edit
            </Typography>
          </Button>
          <Button size="sm" variant="text" color="red" className="flex items-center gap-2" onClick={onDelete}>
            <TrashIcon className="h-4 w-4 text-red-500" />
            <Typography className="!font-semibold text-xs text-red-500 md:block hidden">
              Delete
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
                <Typography className="text-xs !font-bold" color="blue-gray">
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
  // State to manage notes and dialog visibility
  const [notes, setNotes] = useState([
    {
      icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" />,
      title: "Introduction to Python",
      options: {
        Date: "06/06/2024",
      },
    },
    {
      icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" />,
      title: "Wireless and Mobile Communication",
      options: {
        Date: "11/06/2024",
      },
    },
    {
      icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" />,
      title: "Embedded System",
      options: {
        Date: "20/06/2024",
      },
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: "", options: { Date: "" } });
  const [editIndex, setEditIndex] = useState(null);

  // Open dialog to add/edit note
  const handleOpenDialog = (note, index = null) => {
    setIsDialogOpen(true);
    setCurrentNote(note);
    setEditIndex(index);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentNote({ title: "", options: { Date: "" } });
    setEditIndex(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [name]: value,
      },
    }));
  };

  // Save the new/edited note
  const handleSaveNote = () => {
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = { ...currentNote, icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" /> };
      setNotes(updatedNotes);
    } else {
      setNotes((prevNotes) => [...prevNotes, { ...currentNote, icon: <BriefcaseIcon className="h-6 w-6 text-gray-900" /> }]);
    }
    handleCloseDialog();
  };

  // Delete a note
  const handleDeleteNote = (index) => {
    const filteredNotes = notes.filter((_, idx) => idx !== index);
    setNotes(filteredNotes);
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
            <Typography className="mt-1 !font-normal !text-gray-600" variant="small">
              View and update your notes.
            </Typography>
          </div>
          <div className="w-full">
            <Button
              size="sm"
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
              onClick={() => handleOpenDialog({ title: "", options: { Date: "" } })}
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              Add New Note
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 !p-4">
          {notes.map((note, index) => (
            <BCard
              key={index}
              {...note}
              onEdit={() => handleOpenDialog(note, index)}
              onDelete={() => handleDeleteNote(index)}
            />
          ))}
        </CardBody>
      </Card>

      {/* Add/Edit Note Dialog */}
      <Dialog open={isDialogOpen} handler={handleCloseDialog}>
        <DialogHeader>{editIndex !== null ? "Edit Note" : "Add Note"}</DialogHeader>
        <DialogBody>
          <Input
            label="Note Title"
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
            className="mb-4"
          />
          <Input
            label="Date"
            name="Date"
            value={currentNote.options.Date}
            onChange={handleInputChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSaveNote}>
            {editIndex !== null ? "Save Changes" : "Add Note"}
          </Button>
        </DialogFooter>
      </Dialog>

      <TableFooter1 />
    </section>
  );
}

export default Block1;
