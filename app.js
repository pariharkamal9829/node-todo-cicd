import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit3 } from "lucide-react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setInput(tasks[index]);
    setEditingIndex(index);
  };

  const updateTask = () => {
    if (input.trim() !== "" && editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = input;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 text-white">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Stunning To-Do App
      </motion.h1>
      <div className="flex gap-4 w-full max-w-md">
        <Input
          className="flex-1 bg-gray-800 border-gray-700 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        {editingIndex === null ? (
          <Button onClick={addTask}>Add</Button>
        ) : (
          <Button onClick={updateTask}>Update</Button>
        )}
      </div>
      <div className="mt-6 w-full max-w-md">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card className="bg-gray-800 shadow-lg mb-3">
              <CardContent className="flex justify-between items-center p-4">
                <span>{task}</span>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => editTask(index)}>
                    <Edit3 size={16} />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => deleteTask(index)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
