module Failable
  module ActionControllerExtensions
    private
      def render_json_error(obj)
        render :json => obj.error_hash, :status => :unprocessable_entity
      end
  end
  
  module ActiveRecordExtensions
    def error_hash
      key = self.class.to_s.underscore.tr('/', '_')
      hash = errors.inject(Hash.new {|h,k| h[k] = []}) do |acc, (field, error)|
        returning acc do |h|
          h[field] << error
        end
      end
      {key => hash}
    end
  end
end