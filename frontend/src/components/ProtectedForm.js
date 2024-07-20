import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {TextField, Button, Typography, Box} from '@mui/material';
import axios from 'axios';

const ProtectedForm = ({ email, onRestart }) => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/emails/submit-form', { email, formData: data });
      reset();
      setSubmitted(true);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  if (submitted) {
    return (
      <Box textAlign="center">
        <Typography variant="h5" gutterBottom>
          Your form has been submitted successfully!
          <p>Please check your email for the data. </p>
        </Typography>
        <Button onClick={onRestart} variant="contained" color="primary">
          Restart Process
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Typography variant="h4" gutterBottom>
        Protected Form (user: {email})
      </Typography>
      <Typography variant="h6" gutterBottom>
        Please enter your attributes here to request the data. 
      </Typography>
      <Controller
        name="animalId"
        control={control}
        defaultValue=""
        rules={{ required: 'Animal ID is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Animal ID"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.animalId}
            helperText={errors.animalId ? errors.animalId.message : ''}
          />
        )}
      />
      <Controller
        name="animalName"
        control={control}
        defaultValue=""
        rules={{ required: 'Animal Name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Animal Name"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.animalName}
            helperText={errors.animalName ? errors.animalName.message : ''}
          />
        )}
      />
      <Controller
        name="birthLocation"
        control={control}
        defaultValue=""
        rules={{ required: 'Birth Location is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Birth Location"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.birthLocation}
            helperText={errors.birthLocation ? errors.birthLocation.message : ''}
          />
        )}
      />
      <Controller
        name="milkProduction"
        control={control}
        defaultValue=""
        rules={{ required: 'Milk Production is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Milk Production"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.milkProduction}
            helperText={errors.milkProduction ? errors.milkProduction.message : ''}
          />
        )}
      />
      <Controller
        name="healthStatus"
        control={control}
        defaultValue=""
        rules={{ required: 'Health Status is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Health Status"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.healthStatus}
            helperText={errors.healthStatus ? errors.healthStatus.message : ''}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default ProtectedForm;
