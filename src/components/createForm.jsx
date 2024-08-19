import PropTypes from 'prop-types';
import { toTitleCase } from '../helper-functions';

export default function CreateForm({section, dataKey, id, className, style, onChange, onSubmit, onDelete, onCancel}) {
        const keys = Object.keys(section).filter(key => key !== 'id')
        const labels = keys.map(key => toTitleCase(key.split(/(?=[A-Z])/).join(' ')))

    const formFields = keys.map((key,i) => (
            <div key={key}> 
                <label htmlFor={key}>{labels[i]}</label>
                <input
                type='text'
                name={key}
                value={section[key]}
                onChange={onChange}
                >
                </input>
            </div>
        ))


    return (
        <form style={style} className={className} data-id={id} data-key={dataKey} onSubmit={onSubmit}>
             {formFields}  
             <div className='form-btn-container'>
                {id && (
                    <button onClick={onDelete} className='form-btn' data-id={id} type='button'>Delete</button>
                )}
                <button onClick={onCancel} className='form-btn' data-id={id} type='button'>Cancel</button>
                <button className="form-btn" data-id={id} type="submit">Save</button>
             </div>
        </form>
              
    )
} 


































CreateForm.propTypes = {
    section: PropTypes.shape({
        currentForm: PropTypes.shape({
            // Define the shape based on the section type (education or career)
            school: PropTypes.string,
            degree: PropTypes.string,
            location: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            company: PropTypes.string,
            position: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        editForm: PropTypes.shape({
            // Define the shape based on the section type (education or career)
            school: PropTypes.string,
            degree: PropTypes.string,
            location: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
            company: PropTypes.string,
            position: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string,
        }).isRequired,
        schools: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            school: PropTypes.string,
            degree: PropTypes.string,
            location: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
        })),
        Jobs: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            company: PropTypes.string,
            position: PropTypes.string,
            description: PropTypes.string,
            start: PropTypes.string,
            end: PropTypes.string,
        }))
    }).isRequired,
    dataKey: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};