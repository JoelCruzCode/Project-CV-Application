import PropTypes from 'prop-types';

export default function ResumeCard({ section }) {
    return (
        <div className='resume-card'>
                {Object.keys(section).filter(key => key !== 'id').map(key => {
                    switch(key) {
                        case 'startDate': 
                            return <p>{section.startDate && `${section.startDate}  -  `} {section.endDate}</p>
                        case 'endDate': 
                            return null;
                        
                        default:
                            return <p key={key}>{section[key]}</p>
                    }
                })}   
        </div>
        
    );
}

ResumeCard.propTypes = {
    section: PropTypes.shape({
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        [PropTypes.string]: PropTypes.string,
    }).isRequired,
};
