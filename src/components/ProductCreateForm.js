import { Select } from 'antd'
import FileUpload from './FileUpload'
const { Option } = Select
const ProductCreateForm = ({ title, handleChange, handleCategoryChange, handleSubmit, values, characters, setCharacters, setValues, submitText }) => {

    return (
        <form
            className="w-full relative h-full bg-primary px-2 sm:px-8
             pt-7 pb-10 border-light sm:border-[4px]  space-y-6
              overflow-hidden overflow-y-scroll scrollhost text-center "
            onSubmit={handleSubmit}
        >
            <h1 className="text-lg text-lightest font-bold">{title}</h1>
            {/* {JSON.stringify(values.images)} */}

            <FileUpload values={values} setValues={setValues} />
            <div
                className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-y-3
                md:gap-x-3 md:grid-dense block space-y-4 md:space-y-0 ">
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Title</h3>
                    <input
                        spellCheck="false"
                        autoComplete="false"
                        type="text"
                        name="title"
                        id="title"
                        className="form-admin-input w-full"
                        placeholder="Enter Title"
                        value={values.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="md:flex block  md:flex-col col-span-2 lg:row-span-6 md:row-span-2 relative">
                    <h3 className="text-lightest">Description</h3>
                    <textarea
                        spellCheck='false'
                        type="text"
                        name="description"
                        id="description"
                        className="form-admin-input !text-justify w-full pt-4 
                        h-[300px] md:h-[250px] lg:h-[400px] resize-none px-2"
                        placeholder="Enter Description"
                        maxLength="2000"
                        value={values.description}
                        onChange={(e) => {
                            handleChange(e)
                            setCharacters(e.target.value.length)
                        }}
                    />
                    <span
                        className="absolute right-0 bottom-2 md:bottom-0 bg-lightest
                         text-gray-600 rounded-sm px-1 text-xs "
                    >
                        {characters}/2000
                    </span>
                </div>
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Price</h3>
                    <input
                        spellCheck="false"
                        autoComplete="false"
                        type="number"
                        name="price"
                        id="price"
                        className="form-admin-input w-full"
                        placeholder="Enter Price"
                        value={values.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Quantity</h3>
                    <input
                        spellCheck="false"
                        autoComplete="false"
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="form-admin-input w-full"
                        placeholder="Enter Quantity"
                        value={values.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Shipping</h3>
                    <select
                        name="shipping"
                        id="shipping"
                        className="form-admin-select w-full"
                        value={values.shipping}
                        onChange={handleChange}
                    >
                        <option disabled>Please Select</option>
                        <option value="Yes" className="text-primary text-xs bg-white " >Yes</option>
                        <option value="No" className="text-primary text-xs bg-white ">No</option>
                    </select>
                </div>
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Color</h3>
                    <select
                        name="color"
                        id="color"
                        className="form-admin-select w-full"
                        value={values.color}
                        onChange={handleChange}

                    >
                        <option disabled>Please Select</option>
                        {
                            values.colors.map(c => (<option value={c} key={c} className="text-primary text-xs bg-white ">{c}</option>))
                        }
                    </select>
                </div>
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Brand</h3>
                    <select
                        name="brand"
                        id="brand"
                        className="form-admin-select w-full"
                        value={values.brand}
                        onChange={handleChange}
                    >
                        <option disabled>Please Select</option>
                        {
                            values.brands.map(b => (<option value={b} key={b} className="text-primary text-xs bg-white ">{b}</option>))
                        }
                    </select>
                </div>
                <div className="md:flex block  md:flex-col">
                    <h3 className="text-lightest">Category</h3>
                    <select
                        name="category"
                        id="category"
                        className="form-admin-select w-full"
                        value={values.category}
                        onChange={(e) => {
                            handleChange(e)
                            setValues(prevState => ({ ...prevState, subCategories: [] }))
                        }}
                    >
                        <option disabled>Please Select</option>

                        {
                            values.categories.length > 0 && values.categories.map((cat) => {
                                return <option className="text-primary text-xs bg-white " key={cat._id} value={cat._id}>{cat.name}</option>
                            })}
                    </select>
                </div>
                <div className="md:flex block  md:flex-col">
                    {values.subCategoryOptions.length > 0 && <>
                        <h3 className="text-lightest">Sub Categories</h3>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select multple sub-categories"
                            value={values.subCategories}
                            onChange={(value, e) => {
                                setValues({ ...values, subCategories: value })
                                // console.log(value, e)
                            }}
                        >
                            {
                                values.subCategoryOptions.map(subCat => (
                                    <Option key={subCat._id} value={subCat._id}>{subCat.name}</Option>
                                ))
                            }

                        </Select>
                    </>}
                </div>
                <div className="md:flex block  text-center  md:items-center md:justify-end md:col-span-2 lg:col-span-1 md:flex-col">

                    <button
                        type="submit"
                        className="form-submit w-[150px] h-[40px] mt-2">
                        {submitText}
                    </button>
                </div>
            </div>
        </form >
    )
}

export default ProductCreateForm
