import { Disclosure } from "@headlessui/react";

interface QuestionAccordionProps {
    title: string;
    children: React.ReactNode;
}

export default function QuestionAccordion({ title, children }: QuestionAccordionProps) {
    return (
        <Disclosure defaultOpen>
            {({ open }) => (
                <div className="w-full bg-gradient-to-br from-[#1e1e3f] to-[#1a1a35] border border-gray-700 text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <Disclosure.Button className="w-full flex justify-between items-center text-left text-base font-semibold text-white hover:text-blue-400 transition-colors">
                        <span className="flex-1 pr-4">{title}</span>
                        <span className="text-gray-400 text-xl transition-transform duration-200 transform-gpu">
                            {open ? "▲" : "▼"}
                        </span>
                    </Disclosure.Button>

                    <Disclosure.Panel
                        static
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                            maxHeight: open ? "2000px" : "0px",
                            overflowY: open ? "auto" : "hidden",
                            opacity: open ? 1 : 0,
                        }}
                    >
                        <div className="mt-4">{children}</div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}