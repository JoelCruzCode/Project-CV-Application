import PropTypes from 'prop-types';

export default function EducationCard({ school }) {
    return (
        <div>
            <p>School: {school.school}</p>
            <p>Degree: {school.degree}</p>
            <p>Location: {school.location}</p>
            <p>Start Date: {school.start}</p>
            <p>End Date: {school.end}</p>
        </div>
    );
}

EducationCard.propTypes = {
    school: PropTypes.shape({
        school: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
    }).isRequired
};
