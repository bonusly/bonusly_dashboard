module BonuslyDashboard
  class ApiData
    def initialize(base_url:, params:)
      self.base_url = base_url
      self.params = params
    end

    def as_json
      JSON.parse(response)
    end

    private

    attr_accessor :base_url, :params

    def response
      Net::HTTP.get(url)
    end

    def url
      URI.join(
        base_url,
        endpoint,
        "?#{urlized_params}"
      )
    end

    def urlized_params
      relevant_params.map { |key, value| "#{key}=#{value}" }.join('&')
    end

    def endpoint
      raise 'Please implement endpoint'
    end

    def relevant_params
      {}
    end
  end
end
