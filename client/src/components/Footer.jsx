import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const handleDonateClick = () => {
    alert("Your donation of $432.58 was received! Thank you for your support!");
  };

  return (
    <footer className="border-t w-full flex flex-row justify-between bg-[#1a1a1a]/90 text-zinc-100 p-3 text-center fixed bottom-0 left-0 right-0">
      <div></div>
      <div style={{ marginLeft: "55px" }}>
        <a
          href="https://github.com/bxiong34/journMEy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={30} />
        </a>
      </div>
      <div>
        <button className="border rounded-md p-1" onClick={handleDonateClick}>
          Donate
        </button>
      </div>
    </footer>
  );
}
