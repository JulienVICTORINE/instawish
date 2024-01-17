import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Effacer le token du stockage local lors de la déconnexion
        localStorage.removeItem('Token');
        // Rediriger vers la page de connexion
        navigate('/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4">Instawish</Typography>
            <Typography variant="body1" style={{ marginTop: '20px' }}>
                Êtes-vous sûr de vouloir vous déconnecter ?
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleLogout}>
                Déconnexion
            </Button>
        </div>
    );
};

export default Logout;