import YoutubeEmbed from "../YouTubeEmbedds/YouTubeEmbedd";

export default function MovieTrailerModal({ onClose, trailerLink }) {
    return (
<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-4">
  <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full mx-auto">
    <div className="aspect-w-16 aspect-h-9">
      <YoutubeEmbed embedId={trailerLink}/>
    </div>
    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
  </div>
</div>

    );
  }