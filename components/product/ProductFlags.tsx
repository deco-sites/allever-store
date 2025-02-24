
import Flag from "../../components/ui/Flag.tsx"

function ProductFlags({ productFlags, teasers, additionalProperty }) {
    const renderFlag = (flag) => {
      const teaserNames = teasers?.map((prop) => prop.name);
      const propertyIDs = additionalProperty?.map((prop) => prop.propertyID);
      const hasTeaser = teaserNames?.some((t) =>
        t.includes(flag.collectionID)
      );
  
      if (propertyIDs?.includes(flag.collectionID) || hasTeaser) {
        return <Flag {...flag} />;
      }
      return null;
    };
  
    return (
      <>
        {productFlags.map(renderFlag)}
      </>
    );
  }
  
  export default ProductFlags;
  