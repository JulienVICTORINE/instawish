import React, { useState } from 'react';
import { Button, TextField, Typography, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        username: '',
        general: '',
    });
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            // Réinitialiser les erreurs
            setErrors({
                email: '',
                password: '',
                username: '',
                general: '',
            });

            // // Validation par regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

            if (!emailRegex.test(email)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Adresse e-mail invalide.',
                }));
                return;
            }

            if (!passwordRegex.test(password)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: 'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule et un chiffre.',
                }));
                return;
            }

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            formData.append('profilePicture', profilePicture);

            // console.log(formData.get("profilePicture"));

            const response = await axios.post('https://symfony-instawish.formaterz.fr/api/register', formData);

            
            // Si l'inscription réussit, vous pouvez rediriger l'utilisateur vers la page de connexion
            console.log('Signup successful:', response.data);
            navigate('/login');        
        } catch (error) {
            // Gérez les erreurs ici
            console.error('Signup failed:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                general: 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.',
            }));
        }    
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    return (
        <FormContainer>
            <Typography variant="h4">Instawish</Typography>

            <InputLabel htmlFor="username">Nom d'utilisateur</InputLabel>
            <TextField
                type="text"
                className="form-control"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                required
            />
            
            <InputLabel htmlFor="email">Adresse e-mail</InputLabel>
            <TextField
                type="email"
                className="form-control"
                id="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
            />

            <InputLabel htmlFor="password">Mot de passe</InputLabel>
            <TextField
                type="password"
                className="form-control"
                id="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                required
            />

            <InputLabel htmlFor="profilePicture">Photo de profil</InputLabel>
            <input type="file" accept="image/*" className="form-control" id="profilePicture" onChange={handleFileChange} />

            <Button variant="contained" color="primary" onClick={handleSignup}>
                Créer un compte
            </Button>

            {errors.general && (
                <Typography variant="body2" style={{ marginTop: 20, color: 'red' }}>
                    {errors.general}
                </Typography>
            )}

            <Typography variant="body2" style={{ marginTop: 20 }}>
                Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
            </Typography>
        </FormContainer>
    );
};

export default Signup;
