import '.././App.css'
import Sidebar from '.././components/Sidebar'
import Header from '.././components/Header'
import { Card, CardProps } from '.././components/ui/Card'
import AddContentModal from ".././components/AddContentModal";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast as notify } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { URl } from '../components/lib/utils';
import axios from 'axios';


function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false)
    const [contentData, setContentData] = useState([])

    const query = useQuery({
        queryKey: ['getContent'],
        queryFn: async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("User is not authenticated.");
            }

            const response = await axios.get(`${URl}/content`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            return response.data.content;
        },
    });

    useEffect(() => {
        if (query.isSuccess) {
            console.log(query.data);
            setContentData(query.data);
        }
    }, [query.isSuccess, query.data]); // Re-run effect only when these values change

    if (query.isError) {
        console.error("Error during fetching:", query.error);
    }

    return (
        <>
            <AddContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} toast={notify} />
            <div className="flex h-screen flex-row ">
                <Sidebar />
                <div className="bg-slate-100 w-full">
                    <Header setModalOpen={setModalOpen}></Header>
                    {query.error && <>query.error</>}
                    {query.isPending ?
                        "loading ...." :
                        <CardRender data={contentData}></CardRender>
                    }
                </div>

            </div>
            <ToastContainer />
        </>
    )
}

export default Dashboard


function CardRender({ data }: { data?: CardProps[] }) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-10'>
            {data.map((content, index) => (
                <Card
                    key={index}
                    link={content.link}
                    type={content.type}
                    tag={content.tag}
                    title={content.title}
                    createdAt={content.createdAt}
                />
            ))}
        </div>
    );
}