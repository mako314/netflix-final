import React, { useState } from "react";

const AccordionItem = ({contents, title}) => {

    const [isHidden, setIsHidden] = useState(false);

    const toggleAccordion = () => {
		setIsHidden(!isHidden);
	};

    return (
        <div>
            <div
                className="border-gray-300 mb-4 rounded border"
            >
                <div
                    className="accordion-header bg-gray-100 cursor-pointer px-4 py-2"
                    onClick={() => toggleAccordion()}
                >
                    {title}
                </div>

                <div
                    className={`accordion-content bg-white px-4 pb-4 pt-2 ${
                        isHidden ? "block" : "hidden"
                    }`}
                >
                    {contents}
                </div>
                
            </div>
        </div>
    )
}

export default AccordionItem;