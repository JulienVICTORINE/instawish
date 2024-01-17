import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Grid, Menu, MenuItem, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CenteredTypography = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const RoundedIconButton = styled(IconButton)({
  borderRadius: '50%',
  overflow: 'hidden',
});

const HorizontalScrollContainer = styled('div')({
  display: 'flex',
  overflowX: 'auto',
  padding: '16px',
});

const UserAvatar = styled(Avatar)({
  margin: '0 8px', // Espacement entre les avatars des utilisateurs
});

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les utilisateurs depuis l'API
    const fetchUsers = async () => {
      try {
        // Récupérer le token du stockage local
        const token = localStorage.getItem('Token');

        const urlAPI = axios.create({
          baseURL: "https://symfony-instawish.formaterz.fr/api/"
        });

        const response = await urlAPI.get("/users", {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
            'Content-Type': 'application/json',
          },
        });

        const data = Object.values(response.data);
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    };

    // Appel de la fonction pour récupérer les utilisateurs
    fetchUsers();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Effacer le token du stockage local lors de la déconnexion
    localStorage.removeItem('Token');
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <RoundedIconButton color="primary" aria-label="Ajouter">
            <AddCircleIcon fontSize="large" />
          </RoundedIconButton>
        </Grid>

        <Grid item>
          <CenteredTypography variant="h4">Instawish</CenteredTypography>
        </Grid>

        <Grid item>
          <RoundedIconButton onClick={handleClick}>
            <Avatar alt="username" src={"/path/to/your/avatar.jpg"} />
          </RoundedIconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Mon Profil</MenuItem>
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
          </Menu>
        </Grid>
      </Grid>

      {/* Affichage des utilisateurs avec défilement horizontal */}
      <HorizontalScrollContainer>
        {users.map((user) => (
          <UserAvatar key={user.id} alt={user.username} src={"https://symfony-instawish.formaterz.fr"+user.imageUrl } />
        ))}
      </HorizontalScrollContainer>
    </div>
  );
};

export default Home;
