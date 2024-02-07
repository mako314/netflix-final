

function TVSeriesCarousel(){

    const [selectedIndex, setSelectedIndex] = useState(0);

    console.log(selectedIndex)
    const images = [
    ]

    const projectDisplayComponents = [
      EquipMeHomePage,
      EquipMeMessagingDisplay,
      EquipMeMessagingUserToOwner,
      EquipMeMessagingOwnerToUser,
      EquipMeOwnerDash
    ]

    const scrollCarouselPrevious = () => {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : projectDisplayComponents.length - 1));
    }
    
      const scrollCarouselNext = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % projectDisplayComponents.length);
    }

    const SelectedComponent = projectDisplayComponents[selectedIndex]
    
    return( 
        <div className="bg-gray-50 mx-auto max-w-7xl px-5 py-16 md:px-10">
          <SelectedComponent  
          />
        </div>
    )
}

export default TVSeriesCarousel