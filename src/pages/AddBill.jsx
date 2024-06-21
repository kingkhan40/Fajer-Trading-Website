import React from 'react'

const AddBill = () => {
    return (
        <div>
            <div className="container mx-auto my-10 px-4 sm:px-8">

                    <div className="mx-auto xl:max-w-3xl h-full p-4 flex bg-white rounded-lg shadow overflow-hidden">
                       
                        <div className="w-full ">
                            <form>
                            <div className="mb-4 mt-6">
                                    <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="email">
                                        Invoice No :
                                    </label>
                                    <div className='flex gap-3'>
                                    <input className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10" id="" type="text" placeholder="Your email address" />
                                    <input type="date" name="" id="" className='mx-2 bg-slate-500 p-2 text-white' />
                                    </div>
                                </div>

                                <h1 className=" text-2xl font-bold">Add Bill to : </h1>
                               
                                <div className="mb-4 mt-6">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                    Bl No :
                                    </label>
                                    <input className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10" id="email" type="text" placeholder="Your email address" />
                                </div>
                                <div className="flex w-full mt-8 px-5">
                                    <a href='' className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10" type="button">
                                        1 Add More Container
                                    </a>
                                </div>
                                <div className="flex w-full mt-8 px-5">
                                    <a href='' className="w-full bg-gray-500 text-center cursor-pointer hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded-full focus:outline-none focus:shadow-outline h-10" type="button">
                                        1 Add Another
                                    </a>
                                </div>
                                <div className="mb-6 mt-6">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                                        Vat Tax (%) :
                                    </label>
                                    <input className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10" id="password" type="password" placeholder="Your password" />
                                   
                                </div>
                                <div className="flex w-full mt-8">
                                    <button className="w-full bg-gray-800 hover:bg-grey-900 text-white text-base py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10" type="button">
                                        Generate Bills
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

              
            </div>
        </div>
    )
}

export default AddBill
