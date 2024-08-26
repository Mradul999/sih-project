import React, { useState } from "react";

const VideoTutorials = () => {
  const videos = [
    {
      title: "Video 1",
      url: "https://www.youtube.com/embed/8fWSfEBGobI?si=L7OrJO8gyE0DzK4Z",
      description: "This is the first video tutorial.",
    },
    {
      title: "Video 2",
      url: "https://www.youtube.com/embed/P-cPw-wOABo?si=ULdUat3GOVriI7BM",
      description: "This is the second video tutorial.",
    },
    {
      title: "Video 3",
      url: "https://www.youtube.com/embed/videoId3",
      description: "This is the third video tutorial.",
    },
    {
      title: "Video 4",
      url: "https://www.youtube.com/embed/videoId4",
      description: "This is the fourth video tutorial.",
    },
    {
      title: "Video 5",
      url: "https://www.youtube.com/embed/videoId5",
      description: "This is the fifth video tutorial.",
    },
  
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-600 placeholder:text-gray-500 rounded-md w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg  overflow-hidden"
            >
              <div className=" aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default VideoTutorials;
