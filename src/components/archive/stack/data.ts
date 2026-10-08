export interface StackPicture {
  id: string;
  image: string;
  title: string;
  category: string;
  year: string;
  description?: string;
}

export const PICTURE_STACK_DATA: StackPicture[] = [
  {
    id: "pic-1",
    image: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Brutalist Monolith",
    category: "Architecture",
    year: "2025",
    description: "Geometric monolithic volumes captured under direct midday sunlight.",
  },
  {
    id: "pic-2",
    image: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Concrete Geometric",
    category: "Spatial Study",
    year: "2025",
    description: "Rhythm of cast concrete, shadows and diagonal structural lines.",
  },
  {
    id: "pic-3",
    image: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Urban Facade",
    category: "Light & Form",
    year: "2024",
    description: "High-contrast urban fenestration creating repetitive optical textures.",
  },
  {
    id: "pic-4",
    image: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Curvilinear Pavilion",
    category: "Parametric Design",
    year: "2024",
    description: "Fluid organic geometry translated through advanced timber construction.",
  },
  {
    id: "pic-5",
    image: "https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Timber Atrium",
    category: "Interior Structure",
    year: "2024",
    description: "Warm acoustic slat surfaces soaring toward central skylight apertures.",
  },
  {
    id: "pic-6",
    image: "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Minimal Staircase",
    category: "Circulation",
    year: "2023",
    description: "Sculptural cantilevered concrete steps intersecting raw space.",
  },
  {
    id: "pic-7",
    image: "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Glass Tower Vista",
    category: "Metropolis",
    year: "2023",
    description: "Vertical reflections mirroring changing atmospheric conditions.",
  },
  {
    id: "pic-8",
    image: "https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Monochrome Horizon",
    category: "Perspective",
    year: "2023",
    description: "Pure horizon lines balancing architectural forms with the sky.",
  },
];
