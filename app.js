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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-6 text-white">
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Sleek Dark To-Do App
      </motion.h1>
      <div className="flex gap-4 w-full max-w-md">
        <Input
          className="flex-1 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 rounded-lg px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        {editingIndex === null ? (
          <Button className="bg-purple-600 hover:bg-purple-700 transition-all shadow-lg" onClick={addTask}>Add</Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700 transition-all shadow-lg" onClick={updateTask}>Update</Button>
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
            <Card className="bg-gray-800 border border-gray-700 shadow-lg mb-3 rounded-lg">
              <CardContent className="flex justify-between items-center p-4">
                <span className="text-gray-300">{task}</span>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-blue-500 hover:text-white transition-all"
                    onClick={() => editTask(index)}
                  >
                    <Edit3 size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="hover:bg-red-600 hover:text-white transition-all"
                    onClick={() => deleteTask(index)}
                  >
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
