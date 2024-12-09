import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import Input from "./ui/Input";
import { useMutation } from "@tanstack/react-query";
import Label from "./ui/Label";
import axios from "axios";
import { URl } from "./lib/utils";

const AddContentModal = ({ open, onClose, toast }: { open: boolean, onClose: any, toast: any }) => {

    const [formData, setformData] = useState({
        type: "video",
        title: "",
        description: "",
        tags: "",
        link: ""
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setformData((prevValue) => ({
            ...prevValue,
            [name]: value
        }))
    }

    const mutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("User is not authenticated.");
            }

            const response = await axios.post(`${URl}/content`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },

                })
            return response.data
        },
        onError: (error: any) => {
            console.error("Content Updation Failed:", error);
        },
        onSuccess: () => {
            onClose()
            toast("Content is Successfully Saved")

        }
    })

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-slate-500/60 fixed inset-0 flex justify-center z-50">
                    <div className="flex flex-col justify-center">
                        <div className="bg-white opacity-100 rounded-lg">
                            <div className="flex justify-end">
                                <Button
                                    variant="icon"
                                    startIcon={<X className="" size={19} />}
                                    onClick={onClose}
                                    size="md"
                                />
                            </div>
                            <div className="p-6 flex flex-col gap-4 ">
                                <div className="flex gap-5">

                                </div>
                                <div className=" grid grid-cols-2 gap-4 justify-center">
                                    <Label htmlFor="Type" />
                                    <select name="type" onChange={handleInputChange} value={formData.type} >
                                        <option value="video" >Video</option>
                                        <option value="tweet">Tweet</option>
                                        <option value="document">Document</option>
                                        <option value="links">Links</option>
                                    </select>
                                    <Label htmlFor="Title" />
                                    <Input placeholder="enter the title" name="title" onChange={handleInputChange} ></Input>

                                    <Label htmlFor="Link" />
                                    <Input placeholder="enter the link" onChange={handleInputChange} name="link"></Input>


                                    <Label htmlFor="Description" />
                                    <Input placeholder="enter the description" onChange={handleInputChange} name="description"></Input>
                                    <Label htmlFor="Tags" />
                                    <Input placeholder="optional, seperate them with commas" onChange={handleInputChange} name="tags"></Input>
                                </div>

                                <div className="grid col-span-2 justify-end">
                                    <Button onClick={() => { mutation.mutate() }} size="md" variant="secondary" text="Submit" />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};








export default AddContentModal;
