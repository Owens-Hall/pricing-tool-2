class ShipmentsController < ApplicationController
  def index
    shipments = Shipment.all
    render json: shipments, include: [:dispatcher, :carrier, :origin, :destination]
  end

  def search
    render json: Shipment.search_shipments(permitParams), include: [:dispatcher, :carrier, :origin, :destination]
  end

  private

  def permitParams
    params.permit(:origin_city, :origin_state, :destination_city, :destination_state, :carrier)
  end
end
