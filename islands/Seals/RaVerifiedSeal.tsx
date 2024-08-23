import { useEffect } from "preact/hooks";

const styles = {
  padding: "0px 0 21px",
};

const Security = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "ra-embed-verified-seal";
    script.src = "https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js";
    script.async = true;
    script.setAttribute("data-id", "SU42UkdsUjZ1emVXSjhnLTphbGxldmVy");
    script.setAttribute("data-target", "ra-verified-seal");
    script.setAttribute("data-model", "2");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={styles} id="ra-verified-seal">
      {""}
    </div>
  );
};

export default Security;
