'use client';

import { useRouter } from 'next/navigation';
import { ExitToApp } from '@mui/icons-material';
import { useAuthStore } from '../store/authStore';

export default function AdminPage() {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-4">Welcome to the admin page!</p>
            <button 
                onClick={handleLogout}
                className="bg-blue-950 text-white px-4 py-2 rounded-full border-blue-400 border-2 hover:bg-blue-900 flex items-center"
            >
                <ExitToApp className="mr-2" /> Logout
            </button>
        </div>
    );
}