import { Disclosure } from "@headlessui/react";

export default function QuestionAccordion({ title, children }) {
    return (
        <Disclosure>
            {({ open }) => (
                <div className="w-full bg-[#1e1e3f] text-white p-4 rounded-xl mb-4">
                    <Disclosure.Button className="w-full flex justify-between text-left text-lg font-semibold">
                        {title}
                        <span>{open ? "▲" : "▼"}</span>
                    </Disclosure.Button>

                    <Disclosure.Panel
                        static
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxHeight: open ? "500px" : "0px",
                            overflowY: open ? "auto" : "hidden",
                            opacity: open ? 1 : 0,
                        }}
                    >
                        <div className="mt-4 px-3">{children}</div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}