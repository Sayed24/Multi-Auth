import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
// import csc from 'country-state-city';
import { Country, State, City } from 'country-state-city';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

const ThirdStep = (props) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  //bring in navigate to redirect after adding user
  const navigate = useNavigate();
  //populate our dropdowns
  //countries...
  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const result = await Country.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setLoading(false);
      } catch (err) {
        setCountries([]);
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  //states...
  useEffect(() => {
    const getStates = async () => {
      try {
        setLoading(true);
        const result = await State.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        console.log(allStates);
        const [{ isoCode: firstState } = ''] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelectedState(firstState);
        setLoading(false);
      } catch (err) {
        setStates([]);
        setCities([]);
        setLoading(false);
      }
    };
    getStates();
  }, [selectedCountry]);

  //cities...
  useEffect(() => {
    const getCities = async () => {
      try {
        setLoading(true);
        const result = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        console.log(allCities);
        const [{ isoCode: firstCity } = ''] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);

        setLoading(false);
      } catch (err) {
        setCities([]);
        setLoading(false);
      }
    };
    getCities();
  }, [selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = props;
      const updatedData = {
        country: countries.find(
          (country) => country.isoCode === selectedCountry
        )?.name,
        state: states.find((state) => state.isoCode === selectedState)?.name,
        city: selectedCity,
      };

      //POST REQUEST TO OUR DB
      await axios.post(`${BASE_API_URL}/register`, {
        ...user,
        ...updatedData,
      });
      Swal.fire(
        'Thank you!',
        'You have successfully registered',
        'success'
      ).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          props.resetUser();
          navigate('/');
        }
      });
    } catch (e) {
      if (e.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong!',
          text: e.response.data,
        });
      }
      console.log(e);
    }
  };

  return (
    <Form className='input-form' onSubmit={handleSubmit}>
      <motion.div
        className='col-md-6 offset-md-3'
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Form.Group controlId='country'>
          {loading && <p className='loading'>Loading countries...</p>}
          <Form.Label>Country</Form.Label>
          <Form.Control
            as='select'
            name='country'
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option>Select a country..</option>
            {countries.map(({ isoCode, name, flag }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='state'>
          {loading && <p className='loading'>Loading states...</p>}
          <Form.Label>State</Form.Label>
          <Form.Control
            as='select'
            name='state'
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {states?.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          {loading && <p className='loading'>Loading cities...</p>}
          {cities.length < 1 && 'No cities found'}
          <Form.Label>City</Form.Label>
          <Form.Control
            as='select'
            name='city'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities?.map(({ name }) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type='submit' className='mt-3'>
          Register User
        </Button>
      </motion.div>
    </Form>
  );
};

export default ThirdStep;
