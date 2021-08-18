import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history, location }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);
	const cart = useSelector((state) => state.cart);

	const redirect = location.search ? location.search.split('=')[1] : '/';
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	if (!userInfo) history.push(`/login?redirect=${redirect}`);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter City'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required></Form.Control>
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required></Form.Control>
				</Form.Group>

				<Form.Group controlId='counrty'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required></Form.Control>
				</Form.Group>
				<Button type='submit' variant='dark'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;