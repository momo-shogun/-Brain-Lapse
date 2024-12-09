import { Button } from "./ui/Button"
import { Plus, Share2 } from 'lucide-react';

const headerStyles = "flex justify-between my-6 mx-10 items-center"

const Header = ({setModalOpen}) => {

    return <>
        <div className={headerStyles}>
            <div className="text-2xl font-semibold leading-none tracking-tight">All Notes</div>
            <div className="space-x-3">
                <Button variant="primary" size="md" text="Share Brain" startIcon={<Share2 size={20} />}></Button>
                <Button
                    variant="secondary"
                    size="md"
                    text="Add Content"
                    startIcon={<Plus size={20} />}
                    onClick={() => setModalOpen(true)}>
                </Button>
            </div>
        </div>
    </>
}
export default Header