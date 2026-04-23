import "../styles/Accordion.css";

export default function Accordion({
  title,
  children,
  isOpen,
  onToggle
}){

  return (
    <section className="accordion">
      <header className="accordion-header">
       <button onClick={onToggle} className="accordion-button" aria-expanded={isOpen}>
         <span className="accordion-title">{title}
         </span>
         <span className="accordion-icon">
           {isOpen ? "−" : "+"}
          </span>
        </button>
      </header>

      <main
        className="accordion-main"
        hidden={!isOpen}
      >
        {children}
      </main>
    </section>
  );
};
