import React, { useState } from 'react';
import { Button, TextField, Typography, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
// import Cookies from 'js-cookie';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: '', // Pour les erreurs générales
    });
    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Réinitialiser les erreurs
            setErrors({
                username: '',
                password: '',
                general: '',
            });

            // Valider les champs
            if (!username) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    username: 'Veuillez entrer votre nom d\'utilisateur.',
                }));
                return;
            }

            if (!password) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: 'Veuillez entrer votre mot de passe.',
                }));
                return;
            }

            const urlAPI = axios.create({
                baseURL: "https://symfony-instawish.formaterz.fr/api/"
            });
            const response = await urlAPI.post("/login_check ", { username, password });

            localStorage.setItem("Token", response.data.token);
            navigate("/home");
        } catch (error) {
            console.log(error)
            // setErrorMessage(error.response.data.message);
        }
    };


    return (
        <FormContainer>
            <Typography variant="h4">Instawish</Typography>

            <InputLabel for="username">Nom d'utilisateur</InputLabel>
            <TextField
                label="username"
                type="text"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: '',
                        general: '', // Réinitialiser l'erreur générale lors de la modification du champ
                    }));
                }}
                error={!!errors.username}
                helperText={errors.username}
            />

            <InputLabel for="username">Mot de passe</InputLabel>
            <TextField
                label="password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: '',
                        general: '', // Réinitialiser l'erreur générale lors de la modification du champ
                    }));
                }}
                error={!!errors.password}
                helperText={errors.password}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Connexion
            </Button>

            {errors.general && (
                <Typography variant="body2" style={{ marginTop: 20, color: 'red' }}>
                    {errors.general}
                </Typography>
            )}

            <Typography variant="body2" style={{ marginTop: 20 }}>
                Pas encore de compte ? <Link to="/signup">Créer un compte</Link>
            </Typography>
        </FormContainer>
    );
};

export default Login;
