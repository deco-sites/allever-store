export default function Flag({
    textColor = "#fff",
    Bgcolor = "#000",
    backgroundImage = "",
    label = "Promoção",
    width = "100%"
}) {
    return (
        <div
          class="py-1 lg:px-10 text-xs text-white text-semibold z-10 text-center rounded-[6px] h-8 flex items-center justify-center"
          style={{
            color: textColor,
            backgroundColor: Bgcolor,
            backgroundImage: `url(${backgroundImage ?? ""})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: width
          }}
          dangerouslySetInnerHTML={{ __html: label }}
         />
    );
}