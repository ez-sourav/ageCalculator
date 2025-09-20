const Footer = () => {
    return (
      <footer
        className="fixed bottom-0 left-0 w-full bg-white bg-opacity-80 py-3 text-center text-gray-500 text-sm shadow"
        style={{ animation: "fadeInUp 1s" }}
      >
        <div className="flex flex-col items-center animate-fadeInUp">
          <span className="mb-1">Made By 
            <span className="text-red-500 mx-1" >❤︎</span>
            Sourav Biswas</span>
          <span>
            &copy; {new Date().getFullYear()} Age Calculator. All rights reserved.
          </span>
        </div>
        <style>
          {`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeInUp {
              animation: fadeInUp 1s;
            }
          `}
        </style>
      </footer>
    );
}
export default Footer