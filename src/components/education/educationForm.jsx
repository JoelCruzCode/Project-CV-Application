import PropTypes from 'prop-types';

export default function EducationForm({ education, onChange, onSubmit, onDelete ,onCancel, id, className, style}) {

    return (
        <form style={style} className={className} data-id={id}onSubmit={onSubmit}>
            <p>School name</p>
            <input
                type="text"
                name="school"
                value={education.school}
                onChange={onChange}
            />
            <p>Degree</p>
            <input
                type="text"
                name="degree"
                value={education.degree}
                onChange={onChange}
            />
            <p>Location</p>
            <input
                type="text"
                name="location"
                value={education.location}
                onChange={onChange}
            />
            <p>Start date</p>
            <input
                type="date"
                name="start"
                value={education.start}
                onChange={onChange}
            />
            <p>End date</p>
            <input
                type="date"
                name="end"
                value={education.end}
                onChange={onChange}
            />
            <div className='form-btn-container'>
                <button onClick={onDelete} className='form-btn' data-id={id} type='click'>Delete</button>
                <button onClick={onCancel} className='form-btn' data-id={id} type='click'>Cancel</button>
                <button className="form-btn" data-id={id} type="submit">Save</button>
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
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    onChange : PropTypes.func.isRequired,
    onSubmit : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}