module BonuslyDashboard
  class ApiData
    def initialize(base_url:, params:)
      self.base_url = base_url
      self.params = params
    end

    def as_json
      parsed_response
    end

    def success?
      parsed_response.present? && parsed_response['error'].blank?
    end

    private

    attr_accessor :base_url, :params

    def parsed_response
      @parsed_response ||= JSON.parse(response)
    rescue JSON::ParserError => e
      Rails.logger.info "DASHBOARD JSON PARSE ERROR: #{e.message} : #{response}"
      nil
    end

    def response
      @response ||= Net::HTTP.start(url.hostname, url.port, use_ssl: url.to_s.start_with?('https')) do |http|
        http.request(request)
      end.body
    end

    def request
      Net::HTTP::Get.new(url).tap do |req|
        req['Authorization'] = "Bearer #{params[:access_token]}"
      end
    end

    def url
      @url ||= URI.join(
        base_url,
        endpoint,
        "?#{urlized_params}"
      )
    end

    def urlized_params
      URI.encode_www_form(relevant_params.map { |key, value| "#{key}=#{value}" }.join('&'))
    end

    def endpoint
      raise 'Please implement endpoint'
    end

    def relevant_params
      {}
    end
  end
end
