import { VideoCard } from "../../components";

const RelatedVideos = ({ filteredVideos }) => {
  return filteredVideos.length > 0 ? (
    <section className="related-videos">
      <h3 className="h3">Relates Videos</h3>
      <div className="related-videos__caraousel scrollbar">
        {filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  ) : null;
};

export default RelatedVideos;
