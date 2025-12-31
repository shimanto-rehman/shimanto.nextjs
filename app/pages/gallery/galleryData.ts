export interface GalleryImage {
    id: string;
    publicId: string; // The ID from Cloudinary (e.g., "folder/image_name")
    width: number;
    height: number;
    description: string;
  }
  
  export interface GalleryEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    images: GalleryImage[];
  }
  
  export const galleryData: GalleryEvent[] = [
    {
      id: 'evt1',
      title: 'Mutual Trust Bank PLC',
      date: 'March 15, 2024',
      description: 'Keynote speeches and networking moments from the annual summit.',
      images: [
        {
          id: 'img1',
          publicId: 'gallery/foundation-training-award', // Replace with your real Cloudinary Public IDs
          width: 1000,
          height: 1500, // Portrait
          description: 'Award Ceremony of the foundation training'
        },
        {
          id: 'img2',
          publicId: 'gallery/fortis-dayout',
          width: 1200,
          height: 800, // Landscape
          description: 'MTB Fortis Day Out on Dec 19, 2025'
        },
        {
          id: 'img3',
          publicId: 'gallery/bankers-collaboration',
          width: 1000,
          height: 1000, // Square
          description: 'Bankers Collaboration on Nov, 2024'
        },
        {
          id: 'img4',
          publicId: 'gallery/joining-gift',
          width: 800,
          height: 1200,
          description: 'MTB New Joiner Gift on May 18, 2024'
        },
        {
          id: 'img5',
          publicId: 'gallery/singing-in-foundation-training',
          width: 1200,
          height: 800,
          description: 'Photo of the singing competition in the foundation training'
        },
        {
          id: 'img7',
          publicId: 'gallery/group-photo-foundation-training',
          width: 1200,
          height: 600,
          description: 'Foundation Training for In-Service Officers held from July 13 to 31, 2025'
        }
      ]
    },
    {
      id: 'evt2',
      title: 'Extra Caricular Activities',
      date: 'Jan 20, 2024',
      description: 'Organizing and participating in various extracurricular activities.',
      images: [
        
        {
          id: 'img6',
          publicId: 'gallery/marathon',
          width: 800,
          height: 1200,
          description: 'JCI Dhaka West "RISE UP RUN" 7.5KM Marathon on SEP 1, 2025'
        }
      ]
    }
  ];