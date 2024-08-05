import { Fragment } from "react";

export default function Resume () {
    return (
        <Fragment>
            <div className="resume container">
                <div className='resume-personal'>
                    <p>Personal info</p>
                </div>
                <div className="resume-details">
                    <div>
                        <h3>Education</h3>
                    </div>
                   <div>
                    <h3>Experience</h3>
                   </div>
                </div>
            </div>
        </Fragment>
    )

}