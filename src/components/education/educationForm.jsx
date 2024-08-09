import PropTypes from 'prop-types';

export default function EducationForm({ education, onSubmit, onChange }) {
    const { currentForm } = education;

    return (
        <form onSubmit={onSubmit}>
            <p>School name</p>
            <input
                type="text"
                name="school"
                value={currentForm.school}
                onChange={onChange}
            />
            <p>Degree</p>
            <input
                type="text"
                name="degree"
                value={currentForm.degree}
                onChange={onChange}
            />
            <p>Location</p>
            <input
                type="text"
                name="location"
                value={currentForm.location}
                onChange={onChange}
            />
            <p>Start date</p>
            <input
                type="date"
                name="start"
                value={currentForm.start}
                onChange={onChange}
            />
            <p>End date</p>
            <input
                type="date"
                name="end"
                value={currentForm.end}
                onChange={onChange}
            />
            <div>
                <button className="school-btn" type="submit">Save</button>
            </div>
        </form>
    );
}


EducationForm.propTypes = {
    education: PropTypes.shape({
        schools : PropTypes.arrayOf.isRequired, 
        currentForm: PropTypes.shape({
            school : PropTypes.string.isRequired,
            degree: PropTypes.string.isRequired,
            location : PropTypes.string.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        })
    }),
    onChange : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
}