import ContactForm from '@/components/Dashboard/Help/ContactForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { helpData } from '@/lib/helpData'
import { checkUser } from '@/lib/userCheck'

const Help = async () => {
  const { user } = await checkUser()
  return (
    <div className="p-3 sm:p-6">
      <div className="sm:p-6">
        <div className="text-center">
          <h1 className="mt-5 mb-5 text-3xl font-bold sm:mt-0 sm:text-4xl">
            Need Assistance?
          </h1>
          <p className="text-sm text-gray-500 sm:text-base">
            If you&apos;re feeling overwhelmed, remember you don&apos;t have to
            face it alone.
          </p>
          <p className="mb-5 text-sm text-gray-500 sm:text-base">
            Reach out and get the help you need
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 rounded-3xl bg-[var(--sidebar)] p-4 sm:grid-cols-2 sm:p-6">
          <div className="order-2 sm:order-1">
            <h3 className="mb-3 text-2xl font-bold">
              Frequently Asked Questions
            </h3>
            <p className="max-w-xl">
              Everything you need to know about the product and other
              information. Can&apos;t find the answer you&apos;re looking for?
              Write us your question or problem below and we will solve it.
            </p>
            <div>
              <ContactForm email={user.email} name={user.name} />
            </div>
          </div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="category-1"
            >
              {helpData.map(category => (
                <AccordionItem
                  key={category.id}
                  value={`category-${category.id}`}
                >
                  <AccordionTrigger className="font-bold">
                    <div className="flex items-center gap-4">
                      {category.icon}
                      {category.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`faq-${category.id}-${index}`}
                        >
                          <AccordionTrigger className="pl-5">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="pl-5 text-gray-500">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
