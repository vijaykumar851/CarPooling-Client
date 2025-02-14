import React from 'react'

function Footer() {
    return (
        <>
            <footer className='Footer-container' style={{backgroundColor:' hsl(0, 0%, 60%)',color:'white'}}>
                <div className="app-icons">
                    <img src="./insta.png" alt="instagram" style={{ maxHeight: '30px', maxWidth: '30px' ,margin:'5px'}} />
                    <img src="./X.png" alt="X" style={{ maxHeight: '30px', maxWidth: '30px',margin:'5px'}} />
                    <img src="./facebook.png" alt="Facebook" style={{ maxHeight: '30px', maxWidth: '30px',margin:'5px'}} />
                </div>
                <p style={{ fontSize: '1em' }}>© 2025 CarPooling</p>
            </footer>
        </>
    )
}

export default Footer