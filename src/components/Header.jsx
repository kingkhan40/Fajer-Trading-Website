import React from 'react'

const Header = () => {
    return (
        <div>
            <header className="text-gray-600 body-font border-b border-gray-500 bg-white shadow-xl">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                   
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <b className="mr-5 text-xl font-semibold hover:text-gray-900">Manage All</b>
                       
                    </nav>
                   
                </div>
            </header>

        </div>
    )
}

export default Header