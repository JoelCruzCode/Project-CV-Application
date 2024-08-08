import PropTypes from 'prop-types';

export default function PersonalForm({ person, onInputChange }) {
    return (
        <form>
            <p>Full name</p>
            <input name="name" value={person.name} onInput={onInputChange} />
            <p>Email</p>
            <input name="email" value={person.email} onInput={onInputChange} />
            <p>Phone Number</p>
            <input name="phone" value={person.phone} onInput={onInputChange} />
            <p>Address</p>
            <input name="address" value={person.address} onInput={onInputChange} />
            </form>
    );
}

PersonalForm.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
};
