<?php


namespace Medine\ERP\Provider\Infrastructure\Controllers;


use App\Http\Controllers\Controller;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Medine\ERP\Provider\Application\Create\ProviderCreator;
use Medine\ERP\Provider\Application\Create\ProviderCreatorRequest;

class ProviderPostController extends Controller
{
    private $providerCreator;

    public function __construct(ProviderCreator $providerCreator)
    {

        $this->providerCreator = $providerCreator;
    }
    public function __invoke(Request $request)
    {

        ($this->providerCreator)(new ProviderCreatorRequest(
            $request->id,
            $request->name
        ));
        return new JsonResponse([], JsonResponse::HTTP_CREATED);
    }

}
